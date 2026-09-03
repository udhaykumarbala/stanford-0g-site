/**
 * Apollo Cohort 2 waitlist webhook.
 *
 * Receives POSTs from the site's /api/waitlist route and appends a row to
 * the "Apollo Cohort 2 Waitlist" Google Sheet.
 *
 * Deploy (one time, ~2 minutes):
 *   1. Open the sheet: https://docs.google.com/spreadsheets/d/1fAJgYkBq30TRQVy9WwhmumIoK4Pl_xxEHsAoOBvGxLA/edit
 *   2. Extensions → Apps Script, delete the placeholder, paste this file, save.
 *   3. Deploy → New deployment → type "Web app"
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   4. Authorize when prompted, then copy the Web app URL (ends in /exec).
 *   5. Set WAITLIST_WEBHOOK_URL to that URL in .env.local and in Vercel
 *      (Project → Settings → Environment Variables).
 */

var SHEET_ID = "1fAJgYkBq30TRQVy9WwhmumIoK4Pl_xxEHsAoOBvGxLA";
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  var out = { ok: false };
  try {
    var data = JSON.parse(e.postData.contents);
    var email = String(data.email || "").trim().toLowerCase();
    if (!EMAIL_REGEX.test(email)) {
      out.error = "invalid email";
    } else {
      var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        email,
        String(data.source || ""),
      ]);
      out = { ok: true };
    }
  } catch (err) {
    out.error = String(err);
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Quick sanity check: run this from the Apps Script editor to append a test row.
function testAppend() {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  sheet.appendRow([new Date().toISOString(), "test@example.com", "apps-script-test"]);
}

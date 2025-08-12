// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
const baseUrl = import.meta.env.BASE_URL;
// Site config
export const SITE_URL = "https://fylebox.com/"; // your https url
export const SITE_TITLE = "Fylebox Blog"; // your base page title
export const SITE_DESCRIPTION = "Insights, tutorials, and updates from the CSVBox team. Learn about data management, CSV processing, and productivity tools."; // your base description
export const HEADER_TITLE = ""; // your title used in header
export const LOGO_FILE_NAME = "logo.png"; // put your logo in 'public' folder
export const OPEN_GRAPH_IMAGE = "og-image.png"; // put the image in 'public' folder
export const LOCALE = "en-US";

// Analytics
export const GOOGLE_ANALYTICS_ID = "";

// Home page
export const POST_ON_HOME_PAGE = 6; // amount off post on main page
export const POSTS_PER_PAGE = 50; // Pagination on 'Posts' page

// Social config
export const SHOW_SOCIAL_LINKS = true;
export const GITHUB = "https://github.com/instashop-dev";
export const LINKEDIN = "https://www.linkedin.com/company/fylebox";
export const X = "https://x.com/fyleboxcom";
export const FACEBOOK = "https://facebook.com/fylebox";
export const INSTAGRAM = "https://instagram.com/fylebox";
export const EMAIL = "mailto:info@fylebox.io";
export const RSS = `${baseUrl}/rss.xml`;

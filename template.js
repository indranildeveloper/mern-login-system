export default ({ markup, css }) => {
  return /*html*/ `<!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Fonts and Icons -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <style>
          a {
            text-decoration: none;
            color: #061d95;
          }
        </style>

        <title>MERN Skleton</title>
      </head>
      <body style="margin:0">
        <div id="root">${markup}</div>
        <style id="jss-server-side">${css}</style>
        <script type="text/javascript" src="/dist/bundle.js"></script>       
      </body>
    </html>`;
};

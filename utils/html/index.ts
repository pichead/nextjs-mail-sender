


const htmlPromo = (text: string) => {
  return `
  <html>
  
  <head>
    <title>ProMo</title>
    <style>
    a {
      text-decoration:none  !important;
    }

    p {
    }

      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
      }
  
      .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 40px;
        background-color: #B3DDFC;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      h2 {
        color: #333;
      }
  
      .button-link {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: #fff !important;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.3s ease;
      }


  
      .button-link:hover {
        background-color: #45a049;
      }

      .text {
        white-space: pre-line;
      }

    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="text">${text}</div>
    </div>
  </body>
  
  </html>
  `;
};


export const HTML = {
  htmlPromo,
};

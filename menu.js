document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // MENU STYLESPILL
  // =========================

  const menuButtons = document.querySelectorAll(
    ".mobile-menu, .home-menu-trigger"
  );

  menuButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {
      event.preventDefault();

      let menu = document.querySelector(".stylespill-menu");

      // Kalau menu belum ada, buat
      if (!menu) {

        menu = document.createElement("div");
        menu.className = "stylespill-menu";

        menu.innerHTML = `
          <div class="stylespill-menu-box">

            <button class="stylespill-menu-close" type="button">
              ×
            </button>

            <div class="stylespill-menu-title">
              StyleSpill
            </div>

            <div class="stylespill-menu-profile">
              <img src="assets/profile.svg" alt="StyleSpill">
              <div>
                <strong>StyleSpill</strong>
                <small>Men's Fashion Store</small>
              </div>
            </div>

            <nav class="stylespill-menu-links">

              <a href="index.html">
                <span>Home</span>
                <small>01</small>
              </a>

              <a href="products.html">
                <span>Shop</span>
                <small>02</small>
              </a>

              <a href="lookbook.html">
                <span>Lookbook</span>
                <small>03</small>
              </a>

              <a href="profile.html">
                <span>Profil toko</span>
                <small>04</small>
              </a>

              <a href="capcut.html">
                <span>CapCut</span>
                <small>05</small>
              </a>

            </nav>

          </div>
        `;

        document.body.appendChild(menu);

        // Tombol tutup
        const closeButton = menu.querySelector(
          ".stylespill-menu-close"
        );

        closeButton.addEventListener("click", function () {
          menu.classList.remove("open");
        });

        // Klik area luar menu = tutup
        menu.addEventListener("click", function (event) {
          if (event.target === menu) {
            menu.classList.remove("open");
          }
        });

        // Klik link = tutup
        menu.querySelectorAll("a").forEach(function (link) {
          link.addEventListener("click", function () {
            menu.classList.remove("open");
          });
        });
      }

      // Buka menu
      menu.classList.add("open");
    });

  });

});

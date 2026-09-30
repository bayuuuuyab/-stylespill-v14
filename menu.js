document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /*
   * STYLESPILL UNIVERSAL MENU
   */

  // Tambahkan tombol MENU otomatis pada halaman
  // yang belum mempunyai tombol MENU.
  const header = document.querySelector(
    "header.nav, header.topbar"
  );

  if (header && !header.querySelector(".mobile-menu")) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "mobile-menu";
    button.textContent = "MENU";
    button.setAttribute("aria-label", "Buka menu");

    header.appendChild(button);
  }

  /*
   * Halaman utama index.html mempunyai
   * menu sendiri, jadi tidak kita ganggu.
   */

  const buttons = document.querySelectorAll(".mobile-menu");

  buttons.forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();
      event.stopPropagation();

      let overlay = document.querySelector(".menu-overlay");

      /*
       * Buat menu hanya sekali
       */
      if (!overlay) {

        overlay = document.createElement("div");

        overlay.className = "menu-overlay";

        overlay.innerHTML = `
          <div
            class="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu StyleSpill"
          >

            <div class="menu-top">

              <div class="menu-title">
                StyleSpill
              </div>

              <button
                class="menu-close"
                type="button"
                aria-label="Tutup menu"
              >
                ×
              </button>

            </div>

            <div class="menu-profile">

              <img
                src="assets/profile.svg"
                alt="StyleSpill"
              >

              <div>
                <b>StyleSpill</b>
                <small>Men's Fashion Store</small>
              </div>

            </div>

            <nav
              class="menu-links"
              aria-label="Navigasi StyleSpill"
            >

              <a href="index.html">
                <span>Home</span>
                <span>01</span>
              </a>

              <a href="products.html">
                <span>Shop</span>
                <span>02</span>
              </a>

              <a href="lookbook.html">
                <span>Lookbook</span>
                <span>03</span>
              </a>

              <a href="profile.html">
                <span>Profil toko</span>
                <span>04</span>
              </a>

              <a href="capcut.html">
                <span>CapCut</span>
                <span>05</span>
              </a>

            </nav>

          </div>
        `;

        document.body.appendChild(overlay);

        /*
         * Tombol X
         */
        const closeButton =
          overlay.querySelector(".menu-close");

        closeButton.addEventListener("click", function () {

          overlay.classList.remove("open");

          document.body.classList.remove("menu-open");

        });

        /*
         * Klik area gelap di luar panel
         */
        overlay.addEventListener("click", function (event) {

          if (event.target === overlay) {

            overlay.classList.remove("open");

            document.body.classList.remove("menu-open");

          }

        });

        /*
         * Klik salah satu menu
         */
        const links =
          overlay.querySelectorAll(".menu-links a");

        links.forEach(function (link) {

          link.addEventListener("click", function () {

            overlay.classList.remove("open");

            document.body.classList.remove("menu-open");

          });

        });

      }

      /*
       * BUKA MENU
       */
      overlay.classList.add("open");

      document.body.classList.add("menu-open");

    });

  });

});

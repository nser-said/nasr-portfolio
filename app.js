(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
    const form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
            submitBtn.disabled = true;
            try {
                const res = await fetch(this.action, {
                    method: this.method,
                    body: new FormData(this),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    this.innerHTML = '<p style="color: var(--color-secondary); font-size: 1.5rem; text-align: center;">Message sent successfully!</p>';
                } else {
                    alert("Something went wrong. Please try again.");
                }
            } catch {
                alert("Network error. Please check your connection.");
            } finally {
                submitBtn.disabled = false;
            }
        });
    }
    const projects = [
        {
            img: "img/Cap.PNG",
            title: "Luxury Fashion<br>E-Commerce Platform<br>(Strapi Backend)",
            tags: ["Strapi", "Next.js", "E-Commerce"],
            github: "https://github.com/nser-said",
            demo: "https://fashion-store-ochre.vercel.app/"
        },
        {
            img: "img/Capture.PNG",
            title: "Luxury Furniture<br> E-Commerce Platform <br>(Strapi Backend)",
            tags: ["Strapi", "Next.js", "E-Commerce"],
            github: "https://github.com/nser-said",
            demo: "https://furniture-store-74zs.vercel.app/"
        },
        {
            img: "img/Capt.PNG",
            title: "Luxury Perfumes<br>E-Commerce Platform<br>(WordPress Headless CMS)",
            tags: ["WordPress", "Next.js", "E-Commerce"],
            github: "https://github.com/nser-said",
            demo: "https://furniture-store-ten-roan.vercel.app/"
        },
        {
            img: "img/bb.png",
            title: "footwear<br>E-Commerce Platform<br>(Strapi Backend)",
            tags: ["Strapi", "Next.js", "E-Commerce"],
            github: "https://github.com/nser-said/Footwear-Commerce",
            demo: "https://footwear-commerce.vercel.app/"
        },
        {
            img: "img/7.PNG",
            title: "POS System<br>(Desktop App)",
            tags: ["Desktop", "Next.js"],
            github: "",
            demo: "https://crispy-pos-2.vercel.app/"
        },
    ];
    function renderPortfolio(filter) {
        const grid = document.getElementById("portfolio-grid");
        if (!grid) return;
        const filtered = filter === "All" ? projects : projects.filter(p => p.tags.includes(filter));
        grid.innerHTML = filtered.map(p => `
            <div class="portfolio-item">
                <div class="image">
                    <img src="${p.img}" alt="${p.title}" loading="lazy">
                </div>
                <div class="hover-items">
                    <h3>${p.title}</h3>
                    <div class="icons">
                        <a href="${p.github || "https://github.com/nser-said"}" class="icon" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
                        <a href="${p.demo}" class="icon" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-behance"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/nser-said/" class="icon" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join("");
    }
    const tags = ["All", ...new Set(projects.flatMap(p => p.tags))];
    const filterBtns = document.getElementById("filter-btns");
    if (filterBtns) {
        filterBtns.innerHTML = tags.map(t => `<button data-tag="${t}" class="${t === "All" ? "active-filter" : ""}">${t}</button>`).join("");
        filterBtns.addEventListener("click", e => {
            const btn = e.target.closest("button");
            if (!btn) return;
            filterBtns.querySelectorAll("button").forEach(b => b.classList.remove("active-filter"));
            btn.classList.add("active-filter");
            renderPortfolio(btn.dataset.tag);
        });
    }
    renderPortfolio("All");
})();

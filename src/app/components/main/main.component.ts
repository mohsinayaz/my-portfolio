import { NgClass, NgIf } from "@angular/common";
import { AfterViewInit, Component, HostListener, OnInit } from "@angular/core";
import AOS from "aos";

@Component({
  selector: "app-main",
  imports: [NgIf],
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, AfterViewInit {
  isDarkMode: boolean = false;
  showScrollButton: boolean = false;
  activeSection: string = 'main';
  isMenuOpen = false;
  texts = [
    "Hi, I'm Mohsin Ayaz.",
    "A passionate Senior Front-end Developer based in Karachi.",
    "I specialize in Angular, React, and Vue.js development.",
    "Building responsive and modern UIs with Tailwind CSS and Vuetify.",
  ];
  typedText = "";
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Run animation only once
    });
    this.isDarkMode = localStorage.getItem("theme") === "dark";
    this.setTheme(); // Apply the theme when the component initializes
    this.typeEffect();
  }

  typeEffect() {
    const currentText = this.texts[this.textIndex];
    if (this.isDeleting) {
      this.typedText = currentText.substring(0, this.charIndex--);
    } else {
      this.typedText = currentText.substring(0, this.charIndex++);
    }
    let speed = this.isDeleting ? 50 : 100;
    if (!this.isDeleting && this.charIndex === currentText.length) {
      speed = 2000; // Pause before deleting
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      speed = 500; // Pause before typing next sentence
    }

    setTimeout(() => this.typeEffect(), speed);
  }

  downloadResume() {
    const resumeUrl = "/MyResume.pdf";
    window.open(resumeUrl, "_blank");
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.scrollY > 300) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    this.setTheme();
  }

  scrollToSection(event: Event, sectionId: string, mobileViewSidebar = false) {
    event.preventDefault(); // Prevent default anchor behavior
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition =
        section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    if (mobileViewSidebar) {
      this.toggleMenu();
    }
  }

  ngAfterViewInit() {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        }
      },
      {
        threshold: 0.6, // visible 60% or more to trigger
      }
    );

    sections.forEach((section) => observer.observe(section));
  }


  setTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add("dark"); // Apply dark mode
    } else {
      document.documentElement.classList.remove("dark"); // Apply light mode
    }
  }
}

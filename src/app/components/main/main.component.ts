import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-main',
  imports: [NgIf],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  isDarkMode: boolean = false;
  showScrollButton: boolean = false;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    setTimeout(() => {
      AOS.init({ duration: 1000 });
    }, 1000);
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.setTheme(); // Apply the theme when the component initializes
  }

  ngAfterViewInit() {
    AOS.refresh();
  }

  downloadResume() {
    const resumeUrl = '/MyResume.pdf';
    window.open(resumeUrl, '_blank');
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 300) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.setTheme();
  }
  
  scrollToSection(event: Event, sectionId: string, mobileViewSidebar = false) {
    event.preventDefault(); // Prevent default anchor behavior
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
     if(mobileViewSidebar) {
      this.toggleMenu();
     }
  }

  setTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark'); // Apply dark mode
    } else {
      document.documentElement.classList.remove('dark'); // Apply light mode
    }
  }
}

import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';

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
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.setTheme(); // Apply the theme when the component initializes
  }

  downloadResume() {
    const resumeUrl = '/resume.pdf';
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

  setTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark'); // Apply dark mode
    } else {
      document.documentElement.classList.remove('dark'); // Apply light mode
    }
  }
}

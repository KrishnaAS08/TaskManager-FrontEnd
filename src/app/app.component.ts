import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taskmanager';
  links: any[];
  activeLink = -1;
  constructor(private router: Router) {
    this.links = [
      {
        label: 'Add',
        link:'./add',
        index: 0
      },
      {
        label: 'View',
        link: './',
        index: 1
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLink = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
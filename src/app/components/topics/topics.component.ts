import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {

  public pageTitle: string;
  public topics: Topic[];
  public totalPages;
  public page;
  public nextPage;
  public prevPage;
  public numberPages;
  public noPaginate;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.pageTitle = 'Temas';
    this.noPaginate = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        let page = +params.page;
        if (!page || page == null  || page === undefined){
          page = 1;
          this.prevPage = 1;
          this.nextPage = 2;
        }
        this.getTopics(page);
      });
  }

  getTopics(page = 1) {
    this._topicService.getTopics(page).subscribe(
      response => {
        if ( response.topics ) {
          this.topics = response.topics;

          // Navegacion de paginacion
          this.totalPages = response.totalPages;

          const numberPages = [];
          for (let i = 1; i <= this.totalPages; i++) {
            numberPages.push(i);
          }
          this.numberPages = numberPages;

          if (page >= 2) {
            this.prevPage = page - 1;
          }
          else {
            this.prevPage = 1;
          }

          if (page < this.totalPages) {
            this.nextPage = page + 1;
          }
          else {
            this.nextPage = this.totalPages;
          }

        }
        else {
          this._router.navigate(['/inicio']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}

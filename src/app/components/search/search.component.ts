import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import {resolveFileWithPostfixes} from '@angular/compiler-cli/ngcc/src/utils';

@Component({
  selector: 'app-search',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {
  public pageTitle: string;
  public topics: Topic[];
  public noPaginate;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.pageTitle = 'Buscar: ';
    this.noPaginate = true;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        const search = params.search;
        this.pageTitle = 'Buscar: ' + search;
        this.getTopics(search);
      });
  }

  getTopics(search){
    this._topicService.search(search).subscribe(
      response => {
        if (response.topics) {
          this.topics = response.topics;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}

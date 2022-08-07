import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { PastLaunchesListGQL } from '../services/spacexGraphql.service';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchListComponent implements OnInit {

  constructor(private pastLaunchesService: PastLaunchesListGQL) { }

  pastLaunches$ = this.pastLaunchesService
    .fetch({ limit: 30 })
    .pipe(
      // added filter to remove API data that is missing images
      map(res => res.data.launchesPast?.filter(f => (f?.links?.flickr_images?.length || 0) > 0)),
    );

  ngOnInit(): void {
  }

}

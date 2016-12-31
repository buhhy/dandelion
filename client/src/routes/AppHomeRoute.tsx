import * as Relay from 'react-relay';
import {TimelineComponent} from "components/timeline/Timeline";

export default class extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`
      query {
      	viewer
      }`,
  };
  static routeName = 'AppHomeRoute';
}

import * as Relay from 'react-relay';

export default class CreateEntityMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        introduceEntity
      }
    `;
  }

  getVariables() {
    return {
      title: this.props.title,
      content: this.props.content,
    };
  }

  // Use this method to design a ‘fat query’ – one that represents every
  // field in your data model that could change as a result of this mutation.
  // Liking a story could affect the likers count, the sentence that
  // summarizes who has liked a story, and the fact that the viewer likes the
  // story or not. Relay will intersect this query with a ‘tracked query’
  // that represents the data that your application actually uses, and
  // instruct the server to include only those fields in its response.
  getFatQuery() {
    return Relay.QL`
      fragment on IntroduceEntityPayload {
        node
        edge
        viewer
      }
    `;
  }

  // These configurations advise Relay on how to handle the LikeStoryPayload
  // returned by the server. Here, we tell Relay to use the payload to
  // change the fields of a record it already has in the store. The
  // key-value pairs of ‘fieldIDs’ associate field names in the payload
  // with the ID of the record that we want updated.
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'timeline',
      edgeName: 'edge',
      rangeBehaviors: {
        '': 'prepend',
      },
      // type: 'FIELDS_CHANGE',
      // fieldIDs: {
      //   viewer: this.props.viewer.id
      // },
    }];
  }

  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };
}

import * as React from 'react';
import * as Relay from 'react-relay';
import * as styles from './NewEntityCard.scss';
import {TextEntityModel, EntityModel} from 'models/timeline/EntityModel';
import CreateEntityMutation from 'mutations/CreateEntityMutation';
import autobind = require('autobind-decorator');
import classNames = require('classnames');

export interface NewEntityCardViewModel {
  relay: any;
  viewer: {id: string};
  onCreateEntity: (_: EntityModel) => void;
}

// Typescript doesn't allow partial interface/class declarations, so
// setState invocations must have all properties declared or all optional.
export interface NewEntityCardViewState {
  draftCount?: number;
  isOpen?: boolean;
  titleInputValue?: string;
  contentInputValue?: string;
}

class NewEntityCardComponent
    extends React.Component<NewEntityCardViewModel, NewEntityCardViewState> {

  constructor(props: NewEntityCardViewModel) {
    super(props);

    this.state = {
      draftCount: 0,
      isOpen: false,
      titleInputValue: '',
      contentInputValue: '',
    };
  }

  @autobind
  onCancelClick(): void {
    this.closeCard();
  }

  @autobind
  onCreateClick(): void {
    this.props.relay.commitUpdate(new CreateEntityMutation({
      viewer: this.props.viewer,
      title: this.state.titleInputValue,
      content: this.state.contentInputValue,
    }));

    this.setState({ draftCount: this.state.draftCount + 1 });

    this.closeCard();
  }

  @autobind
  onHeaderClick(): void {
    if (!this.state.isOpen) this.openCard();
  }

  @autobind
  onContentValueChange(event: React.FormEvent<HTMLTextAreaElement>): void {
    this.setState({
      contentInputValue: event.currentTarget.value
    });
  }

  @autobind
  onTitleValueChange(event: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      titleInputValue: event.currentTarget.value
    });
  }

  render(): JSX.Element {
    let cardClassNames = classNames(
        styles.card,
        {[styles.open]: this.state.isOpen || false});

    const containerStyle = this.state.isOpen ? {
      height: 'auto',
      display: 'block',
    } : {
      height: 0,
      display: 'none',
    };

    return (
        <section className={cardClassNames}>
          <header className={styles.header} onClick={this.onHeaderClick}>
            <div className={styles.iconContainer}>
              <img
                  className={styles.addIcon}
                  src={require<string>('./assets/icon_add.svg')} />
            </div>
            <h1 className={styles.titleText}>
              Create New Event
            </h1>
            <button
                className={styles.cancelButton}
                onClick={this.onCancelClick}>
              <span className={styles.text}>
                Cancel
              </span>
            </button>
            <button
                className={styles.createButton}
                onClick={this.onCreateClick}>
              <span className={styles.text}>
                Create
              </span>
            </button>
          </header>
          <section className={styles.contentContainer} style={containerStyle}>
            <form className={styles.contentPanel}>
              <div className={styles.row}>
                <span className={`${styles.cell} ${styles.left}`}>
                  <label className={styles.label}>
                    Title
                  </label>
                </span>
                <span className={`${styles.cell}`}>
                  <input
                      className={`${styles.input}`}
                      onChange={this.onTitleValueChange}
                      type="text"
                      value={this.state.titleInputValue} />
                </span>
              </div>
              <div className={styles.row}>
                <span className={`${styles.cell} ${styles.left}`}>
                  <label className={styles.label}>
                    Text
                  </label>
                </span>
                <span className={`${styles.cell}`}>
                  <textarea
                      className={`${styles.input}`}
                      onChange={this.onContentValueChange}
                      value={this.state.contentInputValue} />
                </span>
              </div>
            </form>
          </section>
        </section>
    );
  }

  private openCard(): void {
    this.setState({ isOpen: true });
  }

  private closeCard(): void {
    this.setState({ isOpen: false });
  }
}

const NewEntityCardComponentContainer =
  Relay.createContainer(NewEntityCardComponent, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on User {
          ${CreateEntityMutation.getFragment('viewer')}
        }
      `,
    }
  });

export {NewEntityCardComponentContainer as NewEntityCardComponent};

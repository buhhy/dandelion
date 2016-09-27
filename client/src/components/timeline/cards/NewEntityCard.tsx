import * as React from 'react';
import * as styles from './NewEntityCard.scss';
import autobind = require('autobind-decorator');
import classNames = require('classnames');

export interface NewEntityCardModel {
}

export interface NewEntityCardState {
  isOpen: boolean;
}

export class NewEntityCardComponent
    extends React.Component<NewEntityCardModel, NewEntityCardState> {

  constructor(props: NewEntityCardModel) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  @autobind
  onCancelClick(): void {
    this.closeCard();
  }

  @autobind
  onCreateClick(): void {
    this.closeCard();
  }

  @autobind
  onHeaderClick(): void {
    if (!this.state.isOpen) this.openCard();
  }

  componentDidMount(): void {
    this.closeCard();
  }

  render(): JSX.Element {
    let cardClassNames = classNames(
        styles.card,
        {[styles.open]: this.state.isOpen});

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
          <section className={styles.contentContainer} ref="contentContainer">
            <form className={styles.contentPanel} ref="contentPanel">
              <div className={styles.row}>
                <span className={`${styles.cell} ${styles.left}`}>
                  <label className={styles.label}>
                    Title
                  </label>
                </span>
                <span className={`${styles.cell}`}>
                  <input className={`${styles.input}`} type="text" />
                </span>
              </div>
              <div className={styles.row}>
                <span className={`${styles.cell} ${styles.left}`}>
                  <label className={styles.label}>
                    Text
                  </label>
                </span>
                <span className={`${styles.cell}`}>
                  <textarea className={`${styles.input}`}/>
                </span>
              </div>
            </form>
          </section>
        </section>
    );
  }

  getElementByRef(ref: string): HTMLElement {
    let value = this.refs[ref];
    if ((value as React.ReactInstance) instanceof HTMLElement) {
      return value as HTMLElement;
    }
    throw new Error(`No element found by ref '${ref}'.`);
  }

  openCard(): void {
    this.setState({
      isOpen: true
    });

    let container = this.getElementByRef('contentContainer');
    container.style.height = 'auto';
    container.style.display = 'block';
  }

  closeCard(): void {
    this.setState({
      isOpen: false
    });

    let container = this.getElementByRef('contentContainer');
    container.style.height = '0';
    container.style.display = 'none';
  }
}
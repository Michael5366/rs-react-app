import { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="app__output">
        <div className="app__result">
          <div className="app__items">
            <h3 className="app__items-header">Item name</h3>
            <div className="app__item-name">Item 1</div>
          </div>
          <div className="app__descriptions">
            <h3 className="app__descriptions-header">Item description</h3>
            <div className="app__description">description 1</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

/*

            <div class="app__output">
              <div class="app__result">
                <div class="app__items">
                  <h3 class="app__items-header">Item name</h3>
                  <div class="app__item-name">Item 1</div>
                </div>
                <div class="app__descriptions">
                  <h3 class="app__descriptions-header">Item description</h3>
                  <div class="app__description">description 1</div>
                </div>
              </div>
            </div>

*/

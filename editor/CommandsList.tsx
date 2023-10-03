// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-noCheck
import React, { Component } from 'react';

class CommandList extends Component {
  state = {
    selectedIndex: 0,
  };

  componentDidUpdate(oldProps: any) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown({ event }) {
    if (event.key === 'ArrowUp') {
      this.upHandler();
      return true;
    }

    if (event.key === 'ArrowDown') {
      this.downHandler();
      return true;
    }

    if (event.key === 'Enter') {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index];

    if (item) {
      this.props.command(item);
    }
  }

  render() {
    const { items } = this.props;
    return (
      <div
        style={{ height: '320px' }}
        className="items relative z-10 inline-block overflow-auto  text-sm text-gray-500 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
      >
        {items.map((item, index) => {
          return (
            <button
              className={`item ${
                index === this.state.selectedIndex ? 'is-selected' : ''
              } inline-flex flex-row items-center text-left w-full px-6 py-2 outline-offset-2 gap-3`}
              key={index}
              onClick={() => this.selectItem(index)}
            >
              <div
                className={
                  'itemIcon bg-gray-100 dark:bg-gray-400 p-2 rounded-md'
                }
              >
                {<item.icon className={'w-[1.50rem] h-[1.50rem]'} />}
              </div>
              <div className={'flex flex-col'}>
                <p className={'font-bold text-foreground'}>{item.title}</p>
                <p className={'m-0 text-sm'} style={{ margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    );
  }
}

export default CommandList;

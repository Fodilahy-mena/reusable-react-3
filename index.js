import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
function Accordion({ data, position="top", disabled=[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div data-accordion>
      {data.map((tab, index) => {
        const isActive = index === activeIndex
        const isDisabled = disabled.includes(index)
        const title = (
          <div
            data-panel-title
            className={
              isDisabled ? 'disabled' : isActive ? 'expanded' : ''
            }
            onClick={() => {
              if (!isDisabled) {
                setActiveIndex(index)
              }
            }}
          >
            <span>{tab.label}</span>
            <span>{tab.icon}</span>
          </div>
        )
        const content = (
          <div data-panel-content className={isActive ? 'expanded' : ''}>
            {tab.content}
          </div>
        )
        return (
          <Fragment key={index}>
            { position === 'bottom' ? [content, title] : [title, content] }
          </Fragment>
        )
      })}
    </div>
  )
}
function App() {
  const data = [
    {
      label: 'Paris',
      icon: '🧀',
      content: <Description city="paris" />,
    },
    {
      label: 'Lech',
      icon: '⛷',
      content: <Description city="lech" />,
    },
    {
      label: 'Madrid',
      icon: '🍷',
      content: <Description city="madrid" />,
    },
  ]
  return (
    <div className="App">
      <Accordion data={data} position="bottom" disabled={[1]} />
    </div>
  )
}
function Description({ city }) {
  const data = {
    paris:
      "Paris is the capital and most populous city of France, with a population of 2,148,271 residents. Since the 17th century, Paris has been one of Europe's major centres of finance, diplomacy, commerce, fashion, science and the arts.",
    lech:
      'Lech am Arlberg is a mountain village and an exclusive ski resort in the Bludenz district in the Austrian state of Vorarlberg on the banks of the river Lech.',
    madrid:
      'Madrid is the capital and most populous city of Spain. As the capital city of Spain, seat of government, and residence of the Spanish monarch, Madrid is also the political, economic and cultural centre of the country.',
  }
  return <div>{data[city]}</div>
}
ReactDOM.render(<App />, document.getElementById('root'));

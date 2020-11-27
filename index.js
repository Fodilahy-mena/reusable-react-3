import React, { Fragment, useState, createContext, useContext } from 'react';
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
let AccordionContext = createContext()

function AccordionCC({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div data-accordion>
      {children.map((child, index) => {
        return (
          <AccordionContext.Provider
            key={`section-${index}`}
            value={{index, activeIndex, setActiveIndex}}
          >
            {child}
          </AccordionContext.Provider>
        )
      })}
    </div>
  )
}
let SectionContext = createContext()
function Section({ children, disabled = false,}) {
  return (<SectionContext.Provider value={{disabled}}>
            <div data-section>{children}</div>
          </SectionContext.Provider>)
}
function Title({ children }) {
  let {index, activeIndex, setActiveIndex } = useContext(AccordionContext);
  let { disabled} = useContext(SectionContext)
  let isActive = index === activeIndex
  // const isDisabled = disabled.includes(index2)
  // console.log(isDisabled)
  
  return (
    <div
      data-panel-title
      className={
        disabled ? 'disabled' : isActive ? 'expanded' : ''
      }
      onClick={() => {
        if (!disabled) {
          setActiveIndex(index)
        }
      }}
    >
      {children}
    </div>
  )
}
function Content({ children }) {
  let { index, activeIndex } = useContext(AccordionContext)
  let isActive = index === activeIndex
  return (
    <div data-panel-content className={isActive ? 'expanded' : ''}>
      {children}
    </div>
  )
}
function App() {
  /*const data = [
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
  ]*/
  return (
    <div className="App">
      <AccordionCC>
        <Section>
          <Title>
            <span>🧀</span> Paris
          </Title>
          <Content>
            <Description city="paris" />
          </Content>
        </Section>
        <Section disabled>
          <Title>
            Lech <span>⛷</span>
          </Title>
          <Content>
            <Description city="lech" />
          </Content>
        </Section>
        <Section>
          <Title>
            Madrid <span>🍷</span>
          </Title>
          <Content>
            <Description city="madrid" />
          </Content>
        </Section>
      </AccordionCC>
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
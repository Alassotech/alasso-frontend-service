import React from 'react'
import './css/devbylokie.css'

const DevbyLokie = () => {
  const dev = () => {
    window.location.assign('https://devbylokie.netlify.app', '_blank')
  }

  const openpdf = () => {
    window.open('/prices/DAA_PRICES.pdf', '_blank').focus()
  }

  return (
    <>
      <div className='promotion'>
        <p>Get Your Semester Project Done</p>
        <img src='/images/devbylokie.png' alt='' />
        <div className='promo-desc'>
          Looking for a skilled web developer to help you with{' '}
          <span>college projects</span>, <span> web development</span>,{' '}
          <span> web design</span>,<span> app development</span>,
          <span> code debuggin</span>, <span> native app development</span>.
          Look no further!{' '}
          <span style={{ color: 'yellow' }}>Lokendra Kumar</span> offers
          high-quality work that exceeds expectations. They specialize in
          designing visually appealing, user-friendly websites that are
          optimized for search engines. Additionally, our developer can quickly
          identify and fix bugs in your code, saving you time and frustration.
          They also have experience developing native apps for <span> iOs</span>
          , <span>android</span> and across various industries. Contact our web
          developer today to take your project to the next level with their
          dedication to excellence and expertise.
        </div>
        <div style={{width:'100%', display:'flex', justifyContent:'center', columnGap:'1em'}}>
        <a
          onClick={openpdf}
          style={{
            backgroundColor: 'white',
            color: 'red',
            cursor:'pointer'
          }}
          target={'_blank'}
          className='promo-btn'
        >
          {' '}
          Check Project Prices
        </a>
        <a
          href='https://devbylokie.netlify.app/'
          target={'_blank'}
          className='promo-btn'
        >
          {' '}
          Click To Visit Portfolio
        </a>
        </div>
       
      </div>
    </>
  )
}

export default DevbyLokie

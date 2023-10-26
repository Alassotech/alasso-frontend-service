import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import HelpFilters from './Filters/HelpFilters'
import HelpCards from './Filters/HelpCards'
import { v4 as uuidV4 } from 'uuid'
import '../Components/css/Help.css'
import { InfinitySpin } from 'react-loader-spinner'
import { useAuthStore } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { contestData } from '../store/slices/contestSlice'
const Contest = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { filtered, loading } = useSelector(state => state.contest)

  useEffect(() => {
    const section = document.querySelector('.filter-btns')
    var cardDown = document.querySelectorAll('.filter-btns')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cardDown.forEach(element => {
            element.classList.add('animated')
          })
        }
      })
    })
    observer.observe(section)
    const token = useAuthStore.getState().token
    if (!token) {
      navigate('/login-alert-404')
    }
    dispatch(contestData('https://kontests.net/api/v1/all'))
  }, [navigate])

  useEffect(() => {
    const sections = document.querySelector('.contest-wrap')
    const helpCard = document.querySelectorAll('.helpcard')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          helpCard.forEach(i => {
            i.classList.add('show')
          })
        }
      })
    })

    observer.observe(sections)
  }, [filtered])

  return (
    <>
      <div className='help-cont'>
        <div className='banner'>
          <img src='images/Contests_page.png' alt='' />
        </div>
        <div className='buttons btnss filter-btns'>
          <HelpFilters />
        </div>

        <div className='contest-wrap'>
          {loading ? (
            <div style={{ color: 'orange', alignItems: 'center' }}>
              <InfinitySpin />
            </div>
          ) : (
            filtered.map((contest, index) => {
              return (
                <div className='helpcard'>
                  <HelpCards key={index} contest={contest} />
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

export default Contest

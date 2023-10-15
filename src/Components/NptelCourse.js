import React from 'react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import axios from '../axios'
import './css/NPTELcourse.css'

const NptelCourse = () => {
  const { courseName } = useParams()
  const [assignment, setassignment] = useState([])
  const [content, setcontent] = useState([])
  const [week, setweek] = useState('')
  const [activeweek, setactiveweek] = useState('')
  const [loading, setloading] = useState(true)
  const [btnn, setbtnn] = useState(0)
  const [pagestate, setpagestate] = useState('assignment')
  const [disweeks, setdisweeks] = useState('unhide-weeks')


  const noteContents = [
    { title: 'Bayes theorem', filename: 'Bayes theorem' },
    { title: 'Formula Sheet', filename: 'Probability&StatisticsFormulaGtm' },
    { title: 'Hypothesis', filename: 'Hypothesis' },
    { title: 'Mean, Median Mode', filename: 'MMM' },
    { title: 'formula sheet 2', filename: 'formula sheet' },
    { title: 'P&B Interference', filename: 'P&B Interference' },
    { title: 'Negative Binomial Distribution', filename: '1st' },
    { title: 'BINOMIAL DISTRIBUTION', filename: 'BINOMIAL DISTRIBUTION' },
    { title: 'Bivarete distribution', filename: 'Bivarete distribution' },
    {
      title: 'cor relation and regression',
      filename: 'cor relation and regression'
    },
    { title: 'Curve fitting', filename: 'Curve fitting' },
    { title: 'large sample', filename: 'large sample' },
    { title: 'Normal distribution', filename: 'Normal distribution-1-13' },
    { title: 'RANDOM VARIABLE', filename: 'RANDOM VARIABLE' },
    { title: 'Extra questions', filename: 'Extra questions' }
  ]

  const solutionContents = [
    { title: 'Week 2', filename: 'Week 2' },
    { title: 'Week 3', filename: 'Week 3' },
    { title: 'Week 5', filename: 'Week 5' },
    { title: 'Week 6', filename: 'Week 6' },
    { title: 'Week 7', filename: 'Week 7' },
    { title: 'Week 8', filename: 'Week 8' },
    { title: 'Week 11', filename: 'Week 11pdf' }
  ]

  function showNextBox () {
    const boxes = document.querySelectorAll('.ass-box')
    let index = 0
    const interval = setInterval(() => {
      if (index >= boxes.length) {
        clearInterval(interval)
        return
      }

      boxes[index].classList.add('show')
      index++
    }, 100)
  }

  showNextBox()

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = process.env.PUBLIC_URL + '/books/PYQ.zip'
    link.download = 'PYQ.zip'
    link.click()
  }

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await (await axios.get(`/nptel-courses/${courseName}`)).data
      setassignment(data[0].assignments)
    }

    const filterContent = () => {
      for (const j of assignment) {
        if (j.week_num === week) {
          setcontent(j.content)
        }
      }
      setloading(true)
    }

    fetchCourse()
    filterContent()
  }, [week])

 

  const handleClick = useCallback((currWeek) => {
    toast.success(`Week ${currWeek}`);
    setweek(currWeek);
    setactiveweek('active-week');
    setbtnn(currWeek);
  }, []);

  const handleAssignmet = () => {
    setpagestate('assignment')
    setdisweeks('unhide-weeks')
  }
  const handleNotes = () => {
    setpagestate('notes')
    setdisweeks('hide-weeks')
  }

  const handleSolution = () => {
    setpagestate('solutions')
    setdisweeks('hide-weeks')
  }

  let index = 1

  const memoizedAssignment = useMemo(() => assignment, [assignment])
  const memoizedContent = useMemo(() => content, [content])

  if (!loading) {
    return <div>Loading........</div>
  }
  return (
    <div className='nptel-wrap'>
      <div className='head-nptel'>{courseName}</div>
      <div className='navigation'>
        <button className='btn-nptel assignments' onClick={handleAssignmet}>
          Assignments
        </button>
        <button className='btn-nptel notesnptel' onClick={handleNotes}>
          {' '}
          Notes
        </button>
        <button className='btn-nptel notesnptel' onClick={handleSolution}>
          {' '}
          Solutions
        </button>
      </div>
      <div className={`week-nptel ${disweeks}`}>
        <div className='weekNum'>Week {week}</div>
        <div className={`weekbtn `}>
          {memoizedAssignment.length > 0 ? (
            memoizedAssignment.map(i => {
              return (
                <button
                  onClick={() => handleClick(i.week_num)}
                  className={`week-btn ${
                    i.week_num === btnn ? activeweek : ''
                  }`}
                >
                  {i.week_num}
                </button>
              )
            })
          ) : (
            <div>Loading....</div>
          )}
        </div>
      </div>

      {pagestate === 'assignment' && (
        <div className='content-nptel' id='cont-nptel'>
          {memoizedContent.length > 0 ? (
            memoizedContent.map(content => {
              return (
                <div className='ass-box'>
                  <div className='question'>
                    <span>Question {index++} :</span>
                    <div>{content.question}</div>
                  </div>
                  <hr />
                  <div className='ansN'>
                    <span className='option'>
                      <b>Correct option . </b>
                    </span>
                    <div> {content.answer} </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div
              style={{
                textAlign: 'center',
                fontSize: '5em',
                fontWeight: '800',
                fontFamily: 'Tilt Neon'
              }}
            >
              Select Week
            </div>
          )}
        </div>
      )}

      {pagestate === 'notes' && courseName === 'Probability And Statistics' && (
        <div style={{ textAlign: 'center' }} className='content-nptel-notes'>
          {noteContents.map((note, index) => (
            <div key={index} className='div-iframe'>
              <div className='title'>{note.title}</div>
              <iframe src={`/books/${note.filename}.pdf#toolbar=0`} />
            </div>
          ))}
        </div>
      )}

      {pagestate === 'solutions' &&
        courseName === 'Probability And Statistics' && (
          <div style={{ textAlign: 'center' }} className='content-nptel-notes'>
            {solutionContents.map((solution, index) => (
              <div key={index} className='div-iframe'>
                <div className='title'>{solution.title}</div>
                <iframe
                  src={`/books/${solution.filename}.pdf#toolbar=0`}
                  frameBorder='0'
                />
              </div>
            ))}
            <div className='div-iframe'>
              <div className='title'>Previous Year Solutions</div>
              <button className='download-btn' onClick={handleDownload}>
                Download Zip File
              </button>
            </div>
          </div>
        )}
    </div>
  )
}

export default NptelCourse

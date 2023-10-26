import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Vortex } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { login } from '../store/slices/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const { isLoggedIn, loading, error } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async e => {
    e.preventDefault()
    const userdata = {
      email,
      password
    }
    try {
      dispatch(login(userdata))
      if (error) {
        toast.error('Check Credentials')
      }
      else{

        navigate('/')
      }
    } catch (err) {
      console.log(error)
    }
  }

  console.log(loading)
  return (
    <div className='box-cont'>
      <div className='left'>
        {loading && (
          <Vortex
            visible={true}
            height='80'
            width='100%'
            ariaLabel='vortex-loading'
            wrapperStyle={{ width: '100%' }}
            wrapperClass='vortex-wrapper'
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        )}
        <h3>Login</h3>

        <form onSubmit={handleLogin}>
          <input
            type='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='E-MAIL'
          />
          <input
            type='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='PASSWORD'
          />
          <input className='login-inp' type='submit' value='Login' />
        </form>

        <div className='new'>
          <span>New To Alasso?</span>
          <Link className='link' to={'/signup'}>
            Sign Up
          </Link>
        </div>
        <div className='credential'>
          <span>Login Through</span>
          <div>
            <a href=''>
              {' '}
              <i
                className='text-primary fa fa-2x fa-facebook'
                aria-hidden='true'
              ></i>{' '}
            </a>
            <a href=''>
              {' '}
              <i
                className='text-danger fa fa-2x fa-google'
                aria-hidden='true'
              ></i>{' '}
            </a>
            <a href=''>
              {' '}
              <i
                className='text-primary fa fa-2x fa-twitter'
                aria-hidden='true'
              ></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

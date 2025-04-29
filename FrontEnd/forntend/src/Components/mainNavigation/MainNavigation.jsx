import React from 'react'
import { Link } from 'react-router-dom'
import styles from './MainNaviogation.module.css'

function MainNavigation() {
  return (
    <nav className={styles.nav}>
        <h2>Motivational Quotes App</h2>
        <ul>
            <li> <Link to="/"> All Quotes </Link> </li>
            <li> <Link to="/new"> Add a New Quote </Link> </li>
        </ul>

    </nav>
  )
}

export default MainNavigation
import React from 'react';

import { Link } from 'react-router-dom';

class Layout extends React.Component {
  render() {
    return (
      <>
        <header className='bg-gray-900 text-white h-16 flex justify-center items-center font-bold text-lg'>
          <Link to='/'>tnShop</Link>
        </header>
        <main className='py-10 px-32'>
          {this.props.children}
        </main>
        <footer className='px-32 mt-12'>
          &copy; {new Date().getFullYear()}, Thinknetica
        </footer>
      </>
    );
  }
}

export default Layout;
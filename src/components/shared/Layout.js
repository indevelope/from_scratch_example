import React from 'react';

class Layout extends React.Component {
  render() {
    return (
      <>
        <header className='bg-gray-900 text-white h-16 flex justify-center items-center font-bold text-lg'>tnShop</header>
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
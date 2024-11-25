import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LogoLP3I from './assets/images/logo-lp3i.svg'
import axios from 'axios';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Mahasiswa');
  const [message, setMessage] = useState('');

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleNotification = async (e) => {
    e.preventDefault();
    await axios.post(`https://customer-care-telegraf.politekniklp3i-tasikmalaya.ac.id`, {
      name: name,
      title: title,
      category: category,
      message: message,
    }, {
      headers: {
        'lp3i-api-key': '7f141a32c01a251b'
      }
    })
      .then((res) => {
        setName('');
        setTitle('');
        setMessage('');
        setSuccess(true);
        setFailed(false);
      })
      .catch((err) => {
        setFailed(true);
        setSuccess(false);
      });
  }

  return (
    <main className='w-full bg-[#00426D] flex flex-col justify-center items-center gap-4 h-screen px-5 md:px-0'>
      <div className='max-w-lg mx-auto flex flex-col items-center bg-gray-50 shadow-lg justify-center gap-5 rounded-3xl p-5 overflow-y-auto'>
        <nav className='flex flex-col justify-center items-center gap-4 pb-5'>
          <img src={LogoLP3I} alt="Politeknik LP3I Kampus Tasikmalaya" className='h-[50px]' />
        </nav>
        <form onSubmit={handleNotification} className="w-full max-w-lg mx-auto px-5 space-y-4">
          {
            success && (
              <div className='bg-emerald-500 py-3 px-3 text-white rounded-xl'>
                <h2 className='text-xs text-center space-x-2'>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>Pengaduan terkirim!</span>
                </h2>
              </div>
            )
          }
          {
            failed && (
              <div className='bg-red-500 py-3 px-3 text-white rounded-xl'>
                <h2 className='text-xs text-center space-x-2'>
                  <span>Mohon maaf Server sedang maintenance.</span>
                </h2>
              </div>
            )
          }
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-xs font-medium text-gray-900">Nama Lengkap</label>
              <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-3" placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-xs font-medium text-gray-900">Kategori</label>
              <select id="category" onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-3" required>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Alumni">Alumni</option>
                <option value="Dosen">Dosen</option>
                <option value="Umum">Umum</option>
              </select>
            </div>
          </div>
          <div className='mb-5'>
            <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Judul Masukan</label>
            <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-3" placeholder="Judul masukan" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-xs font-medium text-gray-900">Masukan</label>
            <textarea id="message" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-3" placeholder="Masukan" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          </div>
          <button type="submit" className="flex justify-self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-xs px-5 py-2.5 text-center">Kirim masukan</button>
        </form>
        <footer className='max-w-md mx-auto bg-gray-200 border-2 border-gray-300 p-5 rounded-2xl text-gray-800'>
          <p className='text-xs text-center'>Kami berkomitmen untuk melindungi kerahasiaan data Anda dan memastikan bahwa informasi yang Anda sampaikan akan ditangani dengan penuh keamanan.<br />Anda dapat memiliki keyakinan bahwa laporan Anda akan diperlakukan secara rahasia dan sesuai dengan ketentuan yang berlaku.<br />
            Terima kasih atas kepercayaan Anda dalam menggunakan layanan kami. Kami siap untuk melayani Anda dan menangani setiap pengaduan atau pertanyaan yang Anda miliki.</p>
        </footer>
      </div>
      <p className='text-xs text-center text-white'>Copyright © 2024 Politeknik LP3I Kampus Tasikmalaya</p>
    </main>
  )
}

export default App
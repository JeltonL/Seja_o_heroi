import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const [title, seTitle] = useState('')
    const [description, SetDescription] = useState('')
    const [value, setValue] = useState('')

    const ongId =  localStorage.getItem('ongId')

    const history = useHistory()

    async function handleNewIncident (e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId, 
                }
            })

            history.push('/profile')
            
        } catch (error) {
            alert('Erro ao resistar o caso, tente novamente.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <image src={logoImg} alt="Seja o Herói" />

                    <h1>Registo de novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói que poderá ajudar no caso.</p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                    Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => seTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => SetDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em Kwanzas" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Registar</button>
                </form>
            </div>    
        </div>
    )
}
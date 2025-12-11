import { useState, useEffect } from 'react';
import './FeaturedSection.css';

export function FeaturedSection() {
    const [featuredPokemons, setFeaturedPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedPokemons = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pokemon`);
                const data = await response.json();
                
                // Sélectionner 3 Pokémon aléatoires
                const allPokemon = data.data;
                const selected = [];
                const usedIndices = new Set();
                
                while (selected.length < 3 && selected.length < allPokemon.length) {
                    const randomIndex = Math.floor(Math.random() * allPokemon.length);
                    if (!usedIndices.has(randomIndex)) {
                        usedIndices.add(randomIndex);
                        selected.push({
                            ...allPokemon[randomIndex],
                            imagePosition: selected.length % 2 === 0 ? 'left' : 'right'
                        });
                    }
                }
                
                setFeaturedPokemons(selected);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching featured Pokemon:', error);
                setLoading(false);
            }
        };

        fetchFeaturedPokemons();
    }, []);

    if (loading) {
        return (
            <section className="featured-section">
                <h2 className="featured-title">THIS MONTH'S SELECTION</h2>
                <div className="featured-loading">Loading...</div>
            </section>
        );
    }

    return (
        <section className="featured-section">
            <h2 className="featured-title">THIS MONTH'S SELECTION</h2>
            <div className="featured-list">
                {featuredPokemons.map((pokemon, index) => (
                    <div 
                        key={pokemon.id} 
                        className={`featured-card ${pokemon.imagePosition === 'right' ? 'reverse' : ''}`}
                    >
                        <div className="featured-image">
                            <img src={pokemon.sprite} alt={pokemon.name} />
                        </div>
                        <div className="featured-info">
                            <h3 className="featured-name">{pokemon.name.toUpperCase()}</h3>
                            <div className="featured-types">
                                {pokemon.types.map((type, idx) => (
                                    <span key={idx} className={`type-badge type-${type}`}>
                                        {type.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                            <p className="featured-description">
                                Height: {pokemon.height / 10}m • Weight: {pokemon.weight / 10}kg
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

import './Hero.css';

export function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    WELCOME TO THE<br />
                    POKEDEX
                </h1>
                <button className="hero-button">FEATURED POKEMONS</button>
            </div>
        </section>
    )
}
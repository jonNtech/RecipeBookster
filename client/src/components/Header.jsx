import RecipeBookster from './assets/RecipeBookster.png';

export default function Header() {
    return (
        <nav className="navbar bg-light mb-4 p-0">
            <div className="container">
                <a className="navbar-brand" href='/'>
                    <div className="d-flex">
                        <img src={RecipeBookster} alt="logo" className='mr-2'/>
                    </div>
                </a>
            </div>           
        </nav>
    )
}
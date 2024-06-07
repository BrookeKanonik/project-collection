import React, {useState} from 'react'


let ramenImages = ['https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=1431&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1625420044033-256d145f1648?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']

const Slideshow = () => {
    const [state, setState] = useState(0)

    function prev() {
        setState(prevState => {
            return prevState - 1 < 0 ? ramenImages.length -1 : prevState - 1
        })
    }

    function next() {
        setState(prevState => {
            return prevState + 1 === ramenImages.length ? 0 : prevState + 1
        })
    }

    return (
        <div class='work-section-wrapper'>
            <div className='work-section-top'>
            <p className='primary-subheading'>Image Gallery</p>
            <h1 className='primary-heading'>Ramen Galore</h1>
                <div className='ramenButtons' id='ramenButtonsMobile'>
                    <h3 className="prev"onClick={prev}>PREV</h3>
                        <img className="ramenImage" id='ramenImageMobile' src={ramenImages[state]} alt="Ramen Image" />
                    <h3 className="next" onClick={next}>NEXT</h3>
                </div>
            </div>
        </div>
    )
}

export default Slideshow

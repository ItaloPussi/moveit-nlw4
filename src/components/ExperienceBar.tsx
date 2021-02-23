export default function ExperienceBar() {
    return (
        <header className="experience-bar">
            <span>0 xp</span>
            <div className="experience-bar__bar">
                <div className="experience-bar__percentage-fill" style={{width:  '60%'}} />
                <span className="experience-bar__current-experience" style={{left: '60%'}}>360 xp</span>
            </div>
            <span>600 xp</span>
        </header>
    )
}
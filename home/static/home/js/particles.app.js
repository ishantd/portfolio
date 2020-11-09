
Particles.
init
({
  
// normal options
  selector: 
'.background'
,
  maxParticles: 
450
,
  
// options for breakpoints
  responsive: [
    {
      breakpoint: 5000,
      options: {
        maxParticles: 120,
        color: '#4a4a4a',
        connectParticles: true
      }
    },
    {
      breakpoint: 768,
      options: {
        maxParticles: 80,
        color: '#4a4a4a',
        connectParticles: true
      }
    }, {
      breakpoint: 425,
      options: {
        maxParticles: 50,
        color: '#4a4a4a',
        connectParticles: true
      }
    }, {
      breakpoint: 320,
      options: {
        color: '#4a4a4a',
        maxParticles: 0
 
// disables particles.js
      }
    }
  ]
});
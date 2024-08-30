<template>
  <section class="seo-section">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-5 d-flex flex-column justify-content-center align-items-center buttons-container">
          <button class="seo-button">SEO</button>
          <button class="seo-button">FREE REPORT</button>
          <button class="seo-button live-chat">LIVE CHAT</button>
        </div>
        <div class="col-lg-5 d-flex flex-column justify-content-center consultation-container">
          <h2 class="wave-heading">So you want to ride the wave?!</h2>
          <div class="consultation-content">
            <p>
              View our many resources prior to your consultation. If you are
              ready, consult now!
            </p>
            <hr class="consultation-line" />
            <button class="consultation-button">FREE CONSULTATION</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.seo-section {
  padding: 0 0 70px 0; /* Added 65px padding to the bottom */
  background-color: var(--bs-white);
  margin-top: -75px; /* Move the section up to overlap with the cards */
  position: relative;
  z-index: 1;
}

.container-fluid {
  max-width: 1400px;
  padding: 0 20px 50px 20px;
}

.row {
  gap: 200px;
}

.buttons-container {
  gap: 40px;
  margin-left: -100px;
}

.seo-button {
  background-color: var(--bs-primary);
  color: white;
  padding: 20px 40px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.2em;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
}

.seo-button:hover {
  transform: translateY(-5px);
}

.consultation-container {
  text-align: center;
  margin-right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
}

.wave-heading {
  font-size: 2.5em;
  color: var(--bs-primary);
  margin-bottom: 20px;
  font-weight: bold;
  white-space: nowrap;
  margin-top: 0;
}

.consultation-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-top: 20px;
}

.consultation-container p {
  font-size: 1.2em;
  margin-bottom: 30px;
  font-weight: 600;
}

.consultation-line {
  border: none;
  height: 2px;
  background-color: var(--bs-primary);
  opacity: 1;
  margin: 30px 0;
  width: 100%;
}

.consultation-button {
  background-color: var(--bs-primary);
  color: white;
  padding: 20px 40px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.2em;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-self: center;
  margin-top: 30px;
}

.consultation-button:hover {
  transform: translateY(-5px);
}

@media (max-width: 991px) {
  .seo-section {
    margin-top: -50px; /* Adjust for smaller screens */
    padding-bottom: 65px; /* Maintain the added bottom padding */
  }

  .row {
    gap: 60px;
  }

  .buttons-container,
  .consultation-container {
    align-items: center;
    text-align: center;
    margin-left: 0;
    margin-right: 0;
  }

  .consultation-container hr {
    width: 100%;
  }

  .consultation-button {
    align-self: center;
  }
}

@media (max-width: 768px) {
  .seo-section {
    margin-top: 0; /* Remove negative margin for mobile */
    padding: 25px 0 125px; /* Increased bottom padding to 125px (60px + 65px) */
  }

  .wave-heading {
    font-size: 2em;
  }

  .consultation-container p {
    font-size: 1em;
  }
}
</style>
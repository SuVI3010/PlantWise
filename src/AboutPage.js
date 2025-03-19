import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* About Us Header */}
        <div className="col-12 text-center mb-4">
          <h1>About Us</h1>
          <p className="lead">
            Learn more about the Habitability Tool and the team behind it.
          </p>
        </div>

        {/* Section 1: Introduction */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Our Mission</h4>
              <p className="card-text">
                The Habitability Tool is designed to provide accurate, real-time predictions on the habitability of various locations. By analyzing environmental factors, this tool helps users understand how different locations may be suitable for habitation, helping researchers, scientists, and decision-makers make informed decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Our Team */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Our Team</h4>
              <p className="card-text">
                The development of the Habitability Tool is a collaborative effort between passionate students, scientists, and experts. We are committed to harnessing the power of technology and data to bring valuable insights to environmental research.
              </p>
              <h5>The Developer</h5>
              <p>
                <strong>Viswesh Suri</strong> - Student at BITS Hyderabad
              </p>
              <h5>Our Mentor</h5>
              <p>
                <strong>Akanksha Rathore</strong> - Mentor, BITS Hyderabad.
              </p>
              <h5>Our Collaborators</h5>
              <p>
                <strong>Rohit Naniwadekar</strong> - Scientist at ERA (Environmental Research Associates).
              </p>
              <p>
                <strong>Sharwani Deshpande</strong> - Scientist at ERA (Environmental Research Associates).
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Contact Information */}
        <div className="col-12 mt-5">
          <h3 className="text-center mb-3">Contact Us</h3>
          <div className="text-center">
            <p>
              Have any questions or suggestions? Feel free to reach out to us:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:visweshsuri@gmail.com">visweshsuri@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

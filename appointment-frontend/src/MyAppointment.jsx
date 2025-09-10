import React, { Component } from "react";
import "./AppointmentBooking.css";

const BASEURL = "http://localhost:2030/Appointmentbackend/";

// Fetch all appointments
async function fetchAppointments(callback) {
  try {
    const res = await fetch(`${BASEURL}appointments/list`);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      callback({ status: "error", message: "Invalid JSON from server" });
      return;
    }
    callback({ status: "success", data });
  } catch (err) {
    callback({ status: "error", message: err.message });
  }
}

// Delete appointment
async function deleteAppointment(id, callback) {
  try {
    const res = await fetch(`${BASEURL}appointments/${id}`, { method: "DELETE" });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { status: "success", message: text };
    }
    callback(data);
  } catch (err) {
    callback({ status: "error", message: err.message });
  }
}

class MyAppointments extends Component {
  state = { appointments: [], loading: true, error: null };

  componentDidMount() {
    this.loadAppointments();
  }

  loadAppointments = () => {
    fetchAppointments((res) => {
      if (res.status === "success") {
        this.setState({ appointments: res.data, loading: false });
      } else {
        this.setState({ error: res.message, loading: false });
      }
    });
  };

  handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this appointment?")) return;
    deleteAppointment(id, (res) => {
      if (res.status === "success") {
        this.loadAppointments(); // reload list after deletion
      } else {
        this.setState({ error: res.message });
      }
    });
  };

  render() {
    const { appointments, loading, error } = this.state;

    if (loading) return <div className="appointment-container"><p>Loading...</p></div>;
    if (error) return <div className="appointment-container"><div className="error-message">{error}</div></div>;

    return (
      <div className="appointment-container">
        <div className="appointment-form">
          <h2>My Appointments</h2>
          {appointments.length === 0 ? <p>No appointments found.</p> : (
            <ul className="appointment-list">
              {appointments.map((appt) => (
                <li key={appt.id} className="appointment-item">
                  <strong>{appt.fullName}</strong> - {appt.department}<br />
                  Date: {appt.appointmentDate}, Time: {appt.appointmentTime}<br />
                  Doctor: {appt.doctor?.fullName || "N/A"}
                  <button onClick={() => this.handleDelete(appt.id)} style={{ marginLeft: 16, background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', float: 'right' }}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default MyAppointments;

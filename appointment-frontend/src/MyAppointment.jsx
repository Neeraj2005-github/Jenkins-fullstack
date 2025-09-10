import React, { Component } from "react";
// API functions moved from api.js
const BASEURL = "http://localhost:8057/";

/**
 * Fetch all appointments
 * @param {function} callback - function to handle response
 */
async function fetchAppointments(callback) {
  try {
    const res = await fetch(`${BASEURL}appointments/list`);
    if (!res.ok) throw new Error(`${res.status}::${res.statusText}`);

    const data = await res.json();
    callback({ status: "success", data });
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    callback({ status: "error", message: err.message });
  }
}

/**
 * Delete an appointment by ID
 * @param {number} id - appointment id
 * @param {function} callback - response handler
 */
async function deleteAppointment(id, callback) {
  try {
    const res = await fetch(`${BASEURL}appointments/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error(`${res.status}::${res.statusText}`);

    const data = await res.json();
    callback(data);
  } catch (err) {
    console.error("Error deleting appointment:", err.message);
    callback({ status: "error", message: err.message });
  }
}
import "./AppointmentBooking.css";

class MyAppointments extends Component {
  state = {
    appointments: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    fetchAppointments((res) => {
      if (res.status === "success") {
        this.setState({ appointments: res.data, loading: false });
      } else {
        this.setState({ error: res.message, loading: false });
      }
    });
  }

  handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this appointment?")) return;
    deleteAppointment(id, (res) => {
      if (res.status === "success") {
        this.setState((prev) => ({
          appointments: prev.appointments.filter((appt) => appt.id !== id),
          error: null
        }));
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
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <ul className="appointment-list">
              {appointments.map((appt) => (
                <li key={appt.id} className="appointment-item">
                  <strong>{appt.fullName}</strong> - {appt.department}<br />
                  Date: {appt.appointmentDate}, Time: {appt.appointmentTime}<br />
                  Doctor: {appt.doctor?.fullName || "N/A"}
                  <button
                    className="remove-appointment-btn"
                    onClick={() => this.handleDelete(appt.id)}
                    style={{ marginLeft: 16, background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', float: 'right' }}
                  >
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

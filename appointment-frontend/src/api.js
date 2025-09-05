// api.js
export const BASEURL = "http://localhost:8057/";

/**
 * Fetch all available doctors
 * @param {function} callback - function to handle response
 */
export async function fetchDoctors(callback) {
  try {
    const res = await fetch(`${BASEURL}doctors/list`);
    if (!res.ok) throw new Error(`${res.status}::${res.statusText}`);

    const data = await res.json();
    callback({ status: "success", data });
  } catch (err) {
    console.error("Error fetching doctors:", err.message);
    callback({ status: "error", message: err.message });
  }
}

/**
 * Book a new appointment
 * @param {object} appointmentData - appointment details
 * @param {function} callback - function to handle response
 */
export async function bookAppointment(appointmentData, callback) {
  try {
    const res = await fetch(`${BASEURL}appointments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(appointmentData),
    });

    if (!res.ok) throw new Error(`${res.status}::${res.statusText}`);

    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text); // Try JSON
    } catch {
      data = { status: "success", message: text }; // Fallback to plain text
    }

    callback(data);
  } catch (err) {
    console.error("Error booking appointment:", err.message);
    callback({ status: "error", message: err.message });
  }
}
/**
 * Fetch all appointments
 * @param {function} callback - function to handle response
 */
export async function fetchAppointments(callback) {
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
export async function deleteAppointment(id, callback) {
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

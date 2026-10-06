import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, category, location, date, time, price } = req.body;

    const event = await Event.create({
      title, description, category, location, date, time, price,
      createdBy: req.user.id
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { search, category, location } = req.query;
  let filter = {};

    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: "i" };

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event updated", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const reviewEvent = async (req, res) => {
  try {
    const { status } = req.body; 

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status, reviewedBy: req.user.id },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: `Event ${status}`, event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllEventsForManagement = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
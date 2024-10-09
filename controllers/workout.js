const Workout = require("../models/Workout");

// Add a new workout
module.exports.addWorkout = (req, res) => {
	const newWorkout = new Workout({
		userId: req.user.id,
		name: req.body.name,
		duration: req.body.duration,
		status: req.body.status
	});

	    return newWorkout.save()
        .then(workout => res.status(201).send(workout))
        .catch(err => res.status(500).send({ error: "Error saving workout" }));
};

// Get all workouts for a user
module.exports.getMyWorkouts = (req, res) => {
    Workout.find({ userId: req.user.id })
        .then(workouts => res.status(200).send(workouts))
        .catch(err => res.status(500).send({ error: "Error retrieving workouts" }));
};

// Update a workout
module.exports.updateWorkout = (req, res) => {
    const workoutId = req.params.id;
    Workout.findOneAndUpdate(
        { id: workoutId, userId: req.user.id },
        req.body,
        { new: true }
    )
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).send({ error: "Workout not found" });
        }
        res.status(200).send(updatedWorkout);
    })
    .catch(err => res.status(500).send({ error: "Error updating workout" }));
};

// Delete a workout
module.exports.deleteWorkout = (req, res) => {
    const workoutId = req.params.id;
    Workout.findOneAndDelete({ id: workoutId, userId: req.user.id })
        .then(deletedWorkout => {
            if (!deletedWorkout) {
                return res.status(404).send({ error: "Workout not found" });
            }
            res.status(200).send({ message: "Workout deleted successfully" });
        })
        .catch(err => res.status(500).send({ error: "Error deleting workout" }));
};
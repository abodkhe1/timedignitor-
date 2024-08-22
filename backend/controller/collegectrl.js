const express = require('express');
const College = require('../model/collegeModel'); 

const addCollege = async (req, res) => {
    const { name, location, coursesOffered, fees } = req.body;

    try {
        const existingCollege = await College.findOne({ name });
        if (existingCollege) {
            return res.status(409).send({ collegeAdd: 'failed', message: 'College with this name already exists' });
        }

        const college = new College({ name, location, coursesOffered, fees });
        const addedCollege = await college.save();

        res.status(201).send({ collegeAdd: 'success', college: addedCollege });
    } catch (err) {
        console.error('Server issue, try again later', err);
        res.status(500).send({ collegeAdd: 'failed', message: 'Server error, please try again later' });
    }
};

const updateCollege = async (req, res) => {
    const { id } = req.params;
    const { name, location, coursesOffered, fees } = req.body;

    try {
        const updatedCollege = await College.findByIdAndUpdate(id, { name, location, coursesOffered, fees }, { new: true });

        if (!updatedCollege) {
            return res.status(404).send({ collegeUpdate: 'failed', message: 'College not found' });
        }

        res.status(200).send({ collegeUpdate: 'success', college: updatedCollege });
    } catch (err) {
        console.error('Server issue, try again later', err);
        res.status(500).send({ collegeUpdate: 'failed', message: 'Server error, please try again later' });
    }
};

const getSingleCollege = async (req, res) => {
    const { id } = req.params;

    try {
        const college = await College.findById(id);

        if (!college) {
            return res.status(404).send({ getSingleCollege: 'failed', message: 'College not found' });
        }

        res.status(200).send({ getSingleCollege: 'success', college });
    } catch (err) {
        console.error('Server issue, try again later', err);
        res.status(500).send({ getSingleCollege: 'failed', message: 'Server error, please try again later' });
    }
};

const deleteCollege = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCollege = await College.findByIdAndDelete(id);

        if (!deletedCollege) {
            return res.status(404).send({ deleteCollege: 'failed', message: 'College not found' });
        }

        res.status(200).send({ deleteCollege: 'success', message: 'College deleted successfully' });
    } catch (err) {
        console.error('Server issue, try again later', err);
        res.status(500).send({ deleteCollege: 'failed', message: 'Server error, please try again later' });
    }
};

const getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find();

        res.status(200).send({ getAllColleges: 'success', colleges });
    } catch (err) {
        console.error('Server issue, try again later', err);
        res.status(500).send({ getAllColleges: 'failed', message: 'Server error, please try again later' });
    }
};

module.exports = {
    addCollege,
    updateCollege,
    getSingleCollege,
    deleteCollege,
    getAllColleges
};

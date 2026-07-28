const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON (The Neurotransmitter)
app.use(express.json());

// In-memory data store for projects and submissions
const projects = [
    { id: 1, title: 'Responsive Architecture', status: 'Active' },
    { id: 2, title: 'Backend API Development', status: 'Active' }
];

const submissions = [];

// 1. GET /api/projects - Retrieval. Safe. Idempotent.
app.get('/api/projects', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Projects retrieved successfully',
        data: projects
    });
});

// 2. POST /api/submissions - Creation. Unsafe. The Gatekeeper Rule.
app.post('/api/submissions', (req, res) => {
    const { studentEmail, projectNumber, repoUrl } = req.body;

    // Syntactic & Semantic Validation (Gatekeeper Rule)
    if (!studentEmail || !projectNumber || !repoUrl) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request: Missing required fields (studentEmail, projectNumber, repoUrl)'
        });
    }

    if (typeof projectNumber !== 'number') {
        return res.status(400).json({
            success: false,
            error: 'Bad Request: projectNumber must be a valid number'
        });
    }

    if (!studentEmail.includes('@')) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request: studentEmail format is invalid'
        });
    }

    // Process valid data
    const newSubmission = {
        id: submissions.length + 1,
        studentEmail,
        projectNumber,
        repoUrl,
        submittedAt: new Date().toISOString()
    };
    
    submissions.push(newSubmission);

    // 201 Created Status
    res.status(201).json({
        success: true,
        message: 'Submission created successfully',
        data: newSubmission
    });
});

// 3. Catch-all for 404 Not Found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not Found: The requested endpoint does not exist.'
    });
});

// 4. Global Error Handler (500 Internal Error)
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal Server Error'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🧠 DecodeLabs Nervous System (API) running on port ${PORT}`);
});

-- application_complexity_measurements.sql
-- Table to store complexity measurement data for applications
-- Created: 2026-02-12
-- Purpose: Store the results of application complexity analysis
--          including metrics and soft-measure index calculations

CREATE TABLE IF NOT EXISTS application_complexity_measurements (
    id SERIAL PRIMARY KEY,
    applications_name VARCHAR(255) NOT NULL,

    CONSTRAINT applications_unique UNIQUE (applications_name),

    -- Source metrics from measure_application.pl
    file_count INTEGER,
    loc INTEGER,
    comment_lines INTEGER,
    comment_ratio FLOAT,
    todo_count INTEGER,
    total_size_kb FLOAT,
    maintainability_score FLOAT,

    -- Complexity factors (0-10 scale)
    cc FLOAT,
    ac FLOAT,
    dc FLOAT,
    oc FLOAT,

    -- Final complexity score
    soft_measure_index FLOAT,

    -- Metadata
    measured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);



-- Create comment for table
COMMENT ON TABLE application_complexity_measurements IS
'Stores application complexity measurements including metrics and soft-measure index scores';

COMMENT ON COLUMN application_complexity_measurements.cc IS
'Code Complexity Factor (0-10)';

COMMENT ON COLUMN application_complexity_measurements.ac IS
'Architectural Complexity Factor (0-10)';

COMMENT ON COLUMN application_complexity_measurements.dc IS
'Dependency Complexity Factor (0-10)';

COMMENT ON COLUMN application_complexity_measurements.oc IS
'Operational Complexity Factor (0-10)';

COMMENT ON COLUMN application_complexity_measurements.soft_measure_index IS
'Final Soft-Measure Index (0-10) calculated from four factors';

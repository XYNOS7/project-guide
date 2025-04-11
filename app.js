$(document).ready(function() {

    // Form submission
    $('#projectFinderForm').on('submit', async function(e) {
        e.preventDefault();
        
        // Hide the form and show the loading state
        $('#projectForm').hide();
        $('#loadingState').show();

        // Build data payload from form inputs
        const projectInterests = $('#interests').val();
        const difficultyLevel = $('input[name="difficultyLevel"]:checked').val();
        // Collect selected components as an array
        const components = $('#components').val() || [];
        // Map budget selection to a value that the API expects
        const budgetMap = {
            under25: "0-25",
            "25to50": "25-50",
            "50to100": "50-100",
            "100to200": "100-200",
            over200: "200+"
        };
        const budgetRange = budgetMap[$('#budget').val()] || "";
        const estimatedTime = $('#timeframe').val();
        const projectCount = $('#projectCount').val();

        const payload = {
            projectInterests,
            difficultyLevel,
            components,
            budgetRange,
            estimatedTime,
            projectCount  // Optional extra parameter if needed by the API
        };

        try {
            // Call Magic Loops API (ProjectIdeaAPI) with the built data payload
            const response = await fetch('https://magicloops.dev/api/loop/0bf9e057-dc92-4c4e-8f7b-448d3e1713de/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const responseJson = await response.json();

            // Update the UI with the returned project count and projects list
            // For example, update the project count UI element:
            $('.selected-count').text(projectCount);
            
            // Here you can iterate through responseJson.projects to update the project cards dynamically
            // For brevity, we'll assume the static project cards are replaced manually or updated accordingly.
            // ... code to update project cards with responseJson data ...

            // Hide loading state and show results container
            $('#loadingState').hide();
            $('#resultsContainer').show();
        } catch (error) {
            console.error('Error fetching project ideas:', error);
            alert('There was an error fetching your project ideas. Please try again.');
            $('#loadingState').hide();
            $('#projectForm').show();
        }
    });
    
    // Project details toggle
    $(document).on('click', '.show-details-btn', function() {
        const projectId = $(this).data('project');
        const detailsContainer = $(`#${projectId}`);
        
        if (detailsContainer.is(':visible')) {
            detailsContainer.slideUp(300);
            $(this).text('Show Details');
        } else {
            detailsContainer.slideDown(300);
            $(this).text('Hide Details');
        }
    });
    
    // Start over button
    $(document).on('click', '#startOverBtn', function() {
        $('#resultsContainer').hide();
        $('#projectForm').show();
        $('#projectFinderForm')[0].reset();
        
        // Reset all project details to hidden
        $('.project-details-container').hide();
        $('.show-details-btn').text('Show Details');
    });
    
    // Contact form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        alert('This is a prototype. In the full version, your message would be sent.');
        $('#contactForm')[0].reset();
    });
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });
});
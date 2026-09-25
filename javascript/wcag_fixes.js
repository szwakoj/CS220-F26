// Fix duplicate label issue for MkDocs Material drawer toggle
// Place this in docs/javascripts/fix-labels.js

document.addEventListener('DOMContentLoaded', function() {
  // Find the drawer checkbox input
  const drawerInput = document.getElementById('__drawer');
  
  if (drawerInput) {
    // Find all labels pointing to this input
    const labels = document.querySelectorAll('label[for="__drawer"]');
    
    if (labels.length > 1) {
      // Keep only the first label, remove aria association from others
      labels.forEach((label, index) => {
        if (index > 0) {
          // Remove the 'for' attribute from duplicate labels
          label.removeAttribute('for');
          
          // Add click handler to maintain functionality
          label.addEventListener('click', function(e) {
            e.preventDefault();
            drawerInput.click();
          });
        }
      });
    }
    
    // Fix empty label issue for overlay label
    const overlayLabel = document.querySelector('label.md-overlay[for="__drawer"]');
    if (overlayLabel && !overlayLabel.textContent.trim()) {
      // Add visually hidden text for screen readers
      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = 'Close navigation drawer';
      srText.style.position = 'absolute';
      srText.style.width = '1px';
      srText.style.height = '1px';
      srText.style.padding = '0';
      srText.style.margin = '-1px';
      srText.style.overflow = 'hidden';
      srText.style.clip = 'rect(0,0,0,0)';
      srText.style.whiteSpace = 'nowrap';
      srText.style.border = '0';
      
      overlayLabel.appendChild(srText);
    }
  }
  
  // Also handle search toggle if it has the same issue
  const searchInput = document.getElementById('__search');
  
  if (searchInput) {
    const searchLabels = document.querySelectorAll('label[for="__search"]');
    
    if (searchLabels.length > 1) {
      searchLabels.forEach((label, index) => {
        if (index > 0) {
          label.removeAttribute('for');
          
          label.addEventListener('click', function(e) {
            e.preventDefault();
            searchInput.click();
          });
        }
      });
    }
  }
  
  // Fix empty labels with only SVG icons (menu button)
  const emptyLabels = document.querySelectorAll('label.md-header__button.md-icon');
  
  emptyLabels.forEach(label => {
    // Check if label only contains SVG and no text
    const hasText = Array.from(label.childNodes).some(node => 
      node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
    );
    
    if (!hasText) {
      // Add visually hidden text for screen readers
      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = 'Open navigation menu';
      srText.style.position = 'absolute';
      srText.style.width = '1px';
      srText.style.height = '1px';
      srText.style.padding = '0';
      srText.style.margin = '-1px';
      srText.style.overflow = 'hidden';
      srText.style.clip = 'rect(0,0,0,0)';
      srText.style.whiteSpace = 'nowrap';
      srText.style.border = '0';
      
      label.appendChild(srText);
    }
  });

  // Fix search overlay
  const searchOverlay = document.querySelector('label.md-search__overlay');

  if(searchOverlay){
    const srText = document.createElement('span');
    srText.className = 'sr-only';
    srText.textContent = 'Search overlay';
    srText.style.position = 'absolute';
    srText.style.width = '1px';
    srText.style.height = '1px';
    srText.style.padding = '0';
    srText.style.margin = '-1px';
    srText.style.overflow = 'hidden';
    srText.style.clip = 'rect(0,0,0,0)';
    srText.style.whiteSpace = 'nowrap';
    srText.style.border = '0';

    searchOverlay.appendChild(srText);
  }

  // Fix search icons
  const searchIconLabel = document.querySelector('label.md-search__icon.md-icon');

  if(searchIconLabel){
    const hasText = Array.from(searchIconLabel.childNodes).some(node => 
      node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
    );


    // Make SVG icons display side by side instead of stacked
    const svgs = searchIconLabel.querySelectorAll('svg');
    if (svgs.length > 1) {
      searchIconLabel.style.display = 'inline-flex';
      searchIconLabel.style.alignItems = 'center';
      searchIconLabel.style.gap = '4px';

      svgs.forEach(svg => {
        svg.style.width = '20px';
        svg.style.height = '20px';
        svg.style.flexShrink = '0';
      });
    }

    const srText = document.createElement('span');
    srText.className = 'sr-only';
    srText.textContent = 'Search overlay';
    srText.style.position = 'absolute';
    srText.style.width = '1px';
    srText.style.height = '1px';
    srText.style.padding = '0';
    srText.style.margin = '-1px';
    srText.style.overflow = 'hidden';
    srText.style.clip = 'rect(0,0,0,0)';
    srText.style.whiteSpace = 'nowrap';
    srText.style.border = '0';

    searchIconLabel.appendChild(srText);
  }

  // Fix duplicate labels for navigation toggles
  const navToggles = document.querySelectorAll('input.md-nav__toggle.md-toggle[type="checkbox"]');
  
  navToggles.forEach(navInput => {
    const inputId = navInput.id;
    if (inputId) {
      const labels = document.querySelectorAll(`label[for="${inputId}"]`);
      
      if (labels.length > 1) {
        // Keep only the first label, remove association from others
        labels.forEach((label, index) => {
          if (index > 0) {
            label.removeAttribute('for');
            
            // Add click handler to maintain functionality
            label.addEventListener('click', function(e) {
              e.preventDefault();
              navInput.click();
            });
          }
        });
      }
    }
  });

  // Fix missing label for table of contents toggle
  const tocToggle = document.getElementById('__toc');
  if (tocToggle) {
    const existingLabel = document.querySelector('label[for="__toc"]');
    
    if (!existingLabel) {
      // Add aria-label to the input since there's no visible label
      tocToggle.setAttribute('aria-label', 'Toggle table of contents');
    }
  }

});

class PhotoSorter {
    constructor() {
        this.photos = [];
        this.currentPhotoIndex = 0;
        this.keptPhotos = [];
        this.isUploading = false;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        // Areas
        this.uploadArea = document.getElementById('uploadArea');
        this.sortingArea = document.getElementById('sortingArea');
        this.resultsArea = document.getElementById('resultsArea');
        this.galleryArea = document.getElementById('galleryArea');
        
        // Upload elements
        this.fileInput = document.getElementById('fileInput');
        this.uploadBtn = document.querySelector('.upload-btn');
        
        // Sorting elements
        this.progressText = document.getElementById('progressText');
        this.progressFill = document.getElementById('progressFill');
        this.currentPhoto = document.getElementById('currentPhoto');
        this.deleteBtn = document.getElementById('deleteBtn');
        this.keepBtn = document.getElementById('keepBtn');
        this.stats = document.getElementById('stats');
        this.keptCount = document.getElementById('keptCount');
        this.remainingCount = document.getElementById('remainingCount');
        
        // Results elements
        this.resultsText = document.getElementById('resultsText');
        this.viewGalleryBtn = document.getElementById('viewGalleryBtn');
        this.startOverBtn = document.getElementById('startOverBtn');
        
        // Gallery elements
        this.galleryTitle = document.getElementById('galleryTitle');
        this.galleryGrid = document.getElementById('galleryGrid');
        this.backToSortingBtn = document.getElementById('backToSortingBtn');
        this.startOverFromGalleryBtn = document.getElementById('startOverFromGalleryBtn');
    }
    
    bindEvents() {
        // Upload events
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e.target.files));
        
        // Drag and drop events
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        
        // Action buttons
        this.deleteBtn.addEventListener('click', () => this.handleDelete());
        this.keepBtn.addEventListener('click', () => this.handleKeep());
        
        // Result buttons
        this.viewGalleryBtn.addEventListener('click', () => this.showGallery());
        this.startOverBtn.addEventListener('click', () => this.resetApp());
        
        // Gallery buttons
        this.backToSortingBtn.addEventListener('click', () => this.backToSorting());
        this.startOverFromGalleryBtn.addEventListener('click', () => this.resetApp());
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.add('dragover');
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.remove('dragover');
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.remove('dragover');
        this.handleFileUpload(e.dataTransfer.files);
    }
    
    handleFileUpload(files) {
        if (!files || files.length === 0) return;
        
        this.isUploading = true;
        this.uploadBtn.textContent = 'Uploading...';
        
        // Convert FileList to Array and filter for images
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        
        imageFiles.forEach(file => {
            const id = Math.random().toString(36).substr(2, 9);
            const url = URL.createObjectURL(file);
            this.photos.push({ id, file, url });
        });
        
        this.isUploading = false;
        this.uploadBtn.textContent = 'Choose Files';
        
        if (this.photos.length > 0) {
            this.startSorting();
        }
    }
    
    startSorting() {
        this.uploadArea.style.display = 'none';
        this.sortingArea.style.display = 'block';
        this.updateSortingUI();
    }
    
    updateSortingUI() {
        if (this.currentPhotoIndex >= this.photos.length) {
            this.showResults();
            return;
        }
        
        const currentPhoto = this.photos[this.currentPhotoIndex];
        
        // Update progress
        this.progressText.textContent = `Photo ${this.currentPhotoIndex + 1} of ${this.photos.length}`;
        const progressPercentage = (this.currentPhotoIndex / this.photos.length) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
        
        // Update photo
        this.currentPhoto.src = currentPhoto.url;
        
        // Update stats
        this.keptCount.textContent = this.keptPhotos.length;
        this.remainingCount.textContent = this.photos.length - this.currentPhotoIndex;
    }
    
    handleKeep() {
        if (this.currentPhotoIndex < this.photos.length) {
            const photo = this.photos[this.currentPhotoIndex];
            this.keptPhotos.push(photo);
            this.currentPhotoIndex++;
            this.updateSortingUI();
        }
    }
    
    handleDelete() {
        if (this.currentPhotoIndex < this.photos.length) {
            this.currentPhotoIndex++;
            this.updateSortingUI();
        }
    }
    
    showResults() {
        this.sortingArea.style.display = 'none';
        this.resultsArea.style.display = 'block';
        
        this.resultsText.textContent = `You kept ${this.keptPhotos.length} out of ${this.photos.length} photos`;
    }
    
    showGallery() {
        this.resultsArea.style.display = 'none';
        this.galleryArea.style.display = 'block';
        
        this.galleryTitle.textContent = `Your Kept Photos (${this.keptPhotos.length})`;
        this.renderGallery();
    }
    
    renderGallery() {
        this.galleryGrid.innerHTML = '';
        
        this.keptPhotos.forEach((photo, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = `Kept photo ${index + 1}`;
            
            galleryItem.appendChild(img);
            this.galleryGrid.appendChild(galleryItem);
        });
    }
    
    backToSorting() {
        this.galleryArea.style.display = 'none';
        this.resultsArea.style.display = 'block';
    }
    
    resetApp() {
        // Clean up object URLs to prevent memory leaks
        this.photos.forEach(photo => URL.revokeObjectURL(photo.url));
        this.keptPhotos.forEach(photo => URL.revokeObjectURL(photo.url));
        
        // Reset state
        this.photos = [];
        this.currentPhotoIndex = 0;
        this.keptPhotos = [];
        this.isUploading = false;
        
        // Reset file input
        this.fileInput.value = '';
        
        // Show upload area
        this.uploadArea.style.display = 'block';
        this.sortingArea.style.display = 'none';
        this.resultsArea.style.display = 'none';
        this.galleryArea.style.display = 'none';
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PhotoSorter();
});

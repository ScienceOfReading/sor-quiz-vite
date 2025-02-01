<template>
    <div class="progress-steps">
        <div class="step" :class="{ active: currentStep >= 1, complete: currentStep > 1 }">
            <div class="step-number">1</div>
            <div class="step-label">Question</div>
            <div class="step-line"></div>
        </div>
        <div class="step" :class="{ active: currentStep >= 2, complete: currentStep > 2 }">
            <div class="step-number">2</div>
            <div class="step-label">Answers</div>
            <div class="step-line"></div>
        </div>
        <div class="step" :class="{ active: currentStep >= 3, complete: currentStep > 3 }">
            <div class="step-number">3</div>
            <div class="step-label">Explanation</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressSteps',
    props: {
        currentStep: {
            type: Number,
            default: 1,
            validator: (value) => value >= 1 && value <= 3
        }
    }
}
</script>

<style scoped>
.progress-steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem auto;
    position: relative;
    max-width: 600px;
}

.step {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
}

.step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #e5e7eb;
    color: #9ca3af;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    transition: all 0.3s ease;
}

.step-label {
    margin-left: 0.5rem;
    color: #9ca3af;
    transition: color 0.3s ease;
}

.step-line {
    flex: 1;
    height: 2px;
    background-color: #e5e7eb;
    margin: 0 0.5rem;
    transition: background-color 0.3s ease;
}

.step.active .step-number {
    background-color: #3b82f6;
    color: white;
}

.step.active .step-label {
    color: #3b82f6;
}

.step.complete .step-number {
    background-color: #10b981;
    color: white;
}

.step.complete .step-line {
    background-color: #10b981;
}

.step:last-child .step-line {
    display: none;
}
</style>
<template>
    <div>
        <div class="view-header">
            <slot name="header-p"></slot>
        </div>
        <div class="view-body">
            <div class="left-p">
                <slot name="left-p"></slot>
            </div>
            <div class="right-p">
                <slot name="right-p"></slot>
            </div>
        </div>
        <div class="mid-p">
            <slot name="mid-p"></slot>
        </div>
        <div class="view-footer">
            <slot name="footer-p"></slot>
        </div>
    </div>
</template>

<script></script>

<style lang="scss" scoped>
.view-body {
    display: flex;
    flex-direction: row;
    .mid-p {
        width: 100%;
    }
    .left-p {
        width: 42%;
        margin-left: 2%;
        height: inherit;
    }
    .right-p {
        width: 42%;
        margin-top: 2rem;
        margin-left: 10%;
        height: inherit;
    }
}
@media screen and (max-width: 1000px) {
    .view-body {
        display: flex;
        flex-direction: column;
        margin-left: 0;
        .left-p {
            width: 100%;
        }
        .right-p {
            width: 80%;
            margin: 2rem auto;
        }
    }
}
</style>

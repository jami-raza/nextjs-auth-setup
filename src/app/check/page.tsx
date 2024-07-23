import React from 'react'
import SignIn from '../interfaces/forms/signIn'
import { getAuthToken } from '../actions'
import { redirect } from 'next/navigation'

const Page = async () => {

    return (
        <>

            <div id="fb-root"></div>
            <script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"></script>
            <div className="fb-video" data-href="https://www.facebook.com/facebook/videos/1005703617834543/" data-width="500" data-show-text="false">
                {/* <div className="fb-xfbml-parse-ignore">
                    <blockquote cite="https://www.facebook.com/facebook/videos/10153231379946729/">
                        <a href="https://www.facebook.com/facebook/videos/10153231379946729/">How to Share With Just Friends</a>
                        <p>How to share with just friends.</p>
                        Posted by <a href="https://www.facebook.com/facebook/">Facebook</a> on Friday, December 5, 2014
                    </blockquote>
                </div> */}
            </div>
            {/* <div className="fb-video" data-href="https://www.facebook.com/reel/1005703617834543" data-width="500" data-show-text="false">
                <div className="fb-xfbml-parse-ignore">
                    <blockquote cite="https://www.facebook.com/reel/1005703617834543">
                        <a href="https://www.facebook.com/reel/1005703617834543">How to Share With Just Friends</a>
                        <p>How to share with just friends.</p>
                        Posted by <a href="https://www.facebook.com/facebook/">Facebook</a> on Friday, December 5, 2014
                    </blockquote>
                </div>
            </div> */}
        </>
    )
}

export default Page